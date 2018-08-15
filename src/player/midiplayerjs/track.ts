import { Utils } from './utils';
import { Constants } from './constants';

/**
 * Class representing a track.  Contains methods for parsing events and keeping track of pointer.
 */
export class Track {

	private enabled: boolean = true;
	private pointer: number = 0;
	private lastTick: number = 0;
	public lastStatus = null;
	private index;
	private data;
	private delta: number = 0;
	private runningDelta: number = 0;
	private events = [];
	private tempo;
	public forcedTempo: number = -1;
	public originalTempo: number = -1;

	constructor(index, data) {
		this.enabled = true;
		this.pointer = 0;
		this.lastTick = 0;
		this.lastStatus = null;
		this.index = index;
		this.data = data;
		this.delta = 0;
		this.runningDelta = 0;
		this.events = [];
	}

	/**
	 * Resets all stateful track informaion used during playback.
	 * @return {Track}
	 */
	reset() {
		this.enabled = true;
		this.pointer = 0;
		this.lastTick = 0;
		this.lastStatus = null;
		this.delta = 0;
		this.runningDelta = 0;
		return this;
	}

	/**
	 * Sets this track to be enabled during playback.
	 * @return {Track}
	 */
	enable() {
		this.enabled = true;
		return this;
	}

	/**
	 * Sets this track to be disabled during playback.
	 * @return {Track}
	 */
	disable() {
		this.enabled = false;
		return this;
	}

	/**
	 * Gets byte located at pointer position.
	 * @return {number}
	 */
	getCurrentByte() {
		return this.data[this.pointer];
	}

	/**
	 * Gets count of delta bytes and current pointer position.
	 * @return {number}
	 */
	getDeltaByteCount() {
		// Get byte count of delta VLV
		// http://www.ccarh.org/courses/253/handout/vlv/
		// If byte is greater or equal to 80h (128 decimal) then the next byte
		// is also part of the VLV,
		// else byte is the last byte in a VLV.
		var currentByte = this.getCurrentByte();
		var byteCount = 1;

		while (currentByte >= 128) {
			currentByte = this.data[this.pointer + byteCount];
			byteCount++;
		}

		return byteCount;
	}

	/**
	 * Get delta value at current pointer position.
	 * @return {number}
	 */
	getDelta() {
		return Utils.readVarInt(this.data.slice(this.pointer, this.pointer + this.getDeltaByteCount()));
	}

	/**
	 * Handles event within a given track starting at specified index
	 * @param {number} currentTick
	 * @param {boolean} dryRun - If true events will be parsed and returned regardless of time.
	 */
	handleEvent(currentTick, dryRun) {
		dryRun = dryRun || false;
		if (this.pointer < this.data.length && (dryRun || currentTick - this.lastTick >= this.getDelta())) {
			let event = this.parseEvent();
			
			/*			
			if (this.index > 0 && event.name == "Note on") {
				console.log(this.index + " - new event[delta:" + this.getDelta() + ";currentTick:" + currentTick + ";lastTick:" + this.lastTick + "]");
			}
			*/
			if (this.enabled) return event;
			// Recursively call this function for each event ahead that has 0 delta time?
		}

		return null;
	}

	/**
	 * Get string data from event.
	 * @param {number} eventStartIndex
	 * @return {string}
	 */
	getStringData(eventStartIndex) {
		//var currentByte = this.pointer;
		var byteCount = 1;
		var length = Utils.readVarInt(this.data.slice(eventStartIndex + 2, eventStartIndex + 2 + byteCount));
		//var stringLength = length;

		return Utils.bytesToLetters(this.data.slice(eventStartIndex + byteCount + 2, eventStartIndex + byteCount + length + 2));
	}

	/**
	 * add a message to the event json
	 * @param {any} the eventJson produced
	 * @param {number} the number of messages to add
	 */
	private addMessage(event: any, start: number, howmany: number) {
		for (var i = 0; i < howmany; i++) {
			event.message.push(this.data[start + i]);
		}
	}

	/**
	 * Parses event into JSON and advances pointer for the track
	 * @return {object}
	 */
	parseEvent() {
		var deltaByteCount = this.getDeltaByteCount();
		var eventStartIndex = this.pointer + deltaByteCount;
		var eventJson: any = {};
		eventJson.track = this.index + 1;
		eventJson.delta = this.getDelta();
		eventJson.message = [];
		this.lastTick = this.lastTick + eventJson.delta;
		this.runningDelta += eventJson.delta;
		eventJson.tick = this.runningDelta;

		//eventJson.raw = event;
		if (this.data[eventStartIndex] == 0xff) {
			// Meta Event

			// If this is a meta event we should emit the data and immediately move to the next event
			// otherwise if we let it run through the next cycle a slight delay will accumulate if multiple tracks
			// are being played simultaneously

			switch (this.data[eventStartIndex + 1]) {
				case 0x00: // Sequence Number
					eventJson.name = 'Sequence Number';
					break;
				case 0x01: // Text Event
					eventJson.name = 'Text Event';
					eventJson.string = this.getStringData(eventStartIndex);
					break;
				case 0x02: // Copyright Notice
					eventJson.name = 'Copyright Notice';
					break;
				case 0x03: // Sequence/Track Name
					eventJson.name = 'Sequence/Track Name';
					eventJson.string = this.getStringData(eventStartIndex);
					break;
				case 0x04: // Instrument Name
					eventJson.name = 'Instrument Name';
					eventJson.string = this.getStringData(eventStartIndex);
					break;
				case 0x05: // Lyric
					eventJson.name = 'Lyric';
					eventJson.string = this.getStringData(eventStartIndex);
					break;
				case 0x06: // Marker
					eventJson.name = 'Marker';
					break;
				case 0x07: // Cue Point
					eventJson.name = 'Cue Point';
					eventJson.string = this.getStringData(eventStartIndex);
					break;
				case 0x09: // Device Name
					eventJson.name = 'Device Name';
					eventJson.string = this.getStringData(eventStartIndex);
					break;
				case 0x20: // MIDI Channel Prefix
					eventJson.name = 'MIDI Channel Prefix';
					break;
				case 0x21: // MIDI Port
					eventJson.name = 'MIDI Port';
					eventJson.data = Utils.bytesToNumber([this.data[eventStartIndex + 3]]);
					break;
				case 0x2F: // End of Track
					eventJson.name = 'End of Track';
					break;
				case 0x51: // Set Tempo
					eventJson.name = 'Set Tempo';
					eventJson.data = Math.round(60000000 / Utils.bytesToNumber(this.data.slice(eventStartIndex + 3, eventStartIndex + 6)));
					if (this.forcedTempo < 0) {
						this.tempo = eventJson.data;
					} else {
						var diff = this.forcedTempo - this.originalTempo;
						var newTempo=eventJson.data  + diff;

						eventJson.data = newTempo;
						this.tempo = newTempo;
						/*
						eventJson.data = this.forcedTempo;
						this.tempo = this.forcedTempo;
						*/
					}
					//console.log("new tempo:"+this.tempo);
					break;
				case 0x54: // SMTPE Offset
					eventJson.name = 'SMTPE Offset';
					break;
				case 0x58: // Time Signature
					eventJson.name = 'Time Signature';
					break;
				case 0x59: // Key Signature
					eventJson.name = 'Key Signature';
					break;
				case 0x7F: // Sequencer-Specific Meta-event
					eventJson.name = 'Sequencer-Specific Meta-event';
					break;
				default:
					eventJson.name = 'Unknown: ' + this.data[eventStartIndex + 1].toString(16);
					break;
			}

			var length = this.data[this.pointer + deltaByteCount + 2];
			// Some meta events will have vlv that needs to be handled

			this.addMessage(eventJson, eventStartIndex, 3);
			this.pointer += deltaByteCount + 3 + length;

		} else if (this.data[eventStartIndex] == 0xf0) {
			// Sysex
			eventJson.name = 'Sysex';
			var length = this.data[this.pointer + deltaByteCount + 1];
			this.addMessage(eventJson, eventStartIndex, 2 + length);
			this.pointer += deltaByteCount + 2 + length;
		} else {
			// Voice event
			if (this.data[eventStartIndex] < 0x80) {
				// Running status
				eventJson.running = true;
				eventJson.noteNumber = this.data[eventStartIndex];
				eventJson.noteName = Constants.NOTES[this.data[eventStartIndex]];
				eventJson.velocity = this.data[eventStartIndex + 1];

				if (this.lastStatus <= 0x8f) {
					eventJson.message.push(this.lastStatus);
					eventJson.name = 'Note off';
					eventJson.channel = this.lastStatus - 0x80 + 1;

				} else if (this.lastStatus <= 0x9f) {
					eventJson.message.push(this.lastStatus);
					eventJson.name = 'Note on';
					eventJson.channel = this.lastStatus - 0x90 + 1;
				}
				this.addMessage(eventJson, eventStartIndex, 2);
				this.pointer += deltaByteCount + 2;

			} else {
				this.lastStatus = this.data[eventStartIndex];

				if (this.data[eventStartIndex] <= 0x8f) {
					// Note off
					eventJson.name = 'Note off';
					eventJson.channel = this.lastStatus - 0x80 + 1;
					eventJson.noteNumber = this.data[eventStartIndex + 1];
					eventJson.noteName = Constants.NOTES[this.data[eventStartIndex + 1]];
					eventJson.velocity = Math.round(this.data[eventStartIndex + 2] / 127 * 100);
					this.addMessage(eventJson, eventStartIndex, 3);
					this.pointer += deltaByteCount + 3;

				} else if (this.data[eventStartIndex] <= 0x9f) {
					// Note on
					eventJson.name = 'Note on';
					eventJson.channel = this.lastStatus - 0x90 + 1;
					eventJson.noteNumber = this.data[eventStartIndex + 1];
					eventJson.noteName = Constants.NOTES[this.data[eventStartIndex + 1]];
					eventJson.velocity = Math.round(this.data[eventStartIndex + 2] / 127 * 100);
					this.addMessage(eventJson, eventStartIndex, 3);
					this.pointer += deltaByteCount + 3;

				} else if (this.data[eventStartIndex] <= 0xaf) {
					// Polyphonic Key Pressure
					eventJson.name = 'Polyphonic Key Pressure';
					eventJson.channel = this.lastStatus - 0xa0 + 1;
					eventJson.note = Constants.NOTES[this.data[eventStartIndex + 1]];
					eventJson.pressure = event[2];
					this.addMessage(eventJson, eventStartIndex, 3);
					this.pointer += deltaByteCount + 3;

				} else if (this.data[eventStartIndex] <= 0xbf) {
					// Controller Change
					eventJson.name = 'Controller Change';
					eventJson.channel = this.lastStatus - 0xb0 + 1;
					eventJson.number = this.data[eventStartIndex + 1];
					eventJson.value = this.data[eventStartIndex + 2];
					this.addMessage(eventJson, eventStartIndex, 3);
					this.pointer += deltaByteCount + 3;

				} else if (this.data[eventStartIndex] <= 0xcf) {
					// Program Change
					eventJson.name = 'Program Change';
					eventJson.channel = this.lastStatus - 0xc0 + 1;
					this.addMessage(eventJson, eventStartIndex, 2);
					this.pointer += deltaByteCount + 2;

				} else if (this.data[eventStartIndex] <= 0xdf) {
					// Channel Key Pressure
					eventJson.name = 'Channel Key Pressure';
					eventJson.channel = this.lastStatus - 0xd0 + 1;
					this.addMessage(eventJson, eventStartIndex, 2);
					this.pointer += deltaByteCount + 2;

				} else if (this.data[eventStartIndex] <= 0xef) {
					// Pitch Bend
					eventJson.name = 'Pitch Bend';
					eventJson.channel = this.lastStatus - 0xe0 + 1;
					this.addMessage(eventJson, eventStartIndex, 2);
					this.pointer += deltaByteCount + 3;

				} else {
					eventJson.name = 'Unknown.  Pointer: ' + this.pointer.toString() + ' ' + eventStartIndex.toString() + ' ' + this.data.length;
				}
			}
		}

		this.delta += eventJson.delta;
		this.events.push(eventJson);

		return eventJson;
	}

	/**
	 * Returns true if pointer has reached the end of the track.
	 * @param {boolean}
	 */
	endOfTrack() {
		if (this.data[this.pointer + 1] == 0xff && this.data[this.pointer + 2] == 0x2f && this.data[this.pointer + 3] == 0x00) {
			return true;
		}

		return false;
	}
}