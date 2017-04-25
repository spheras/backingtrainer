export class Settings {
    public playerSettings: PlayerSettings = new PlayerSettings();
}

export class PlayerSettings {
    /**
     * indicates if we want to show a cursor during the playing
     */
    public cursor: boolean = true;
    /**
     * if the cursor should move with animation or not. (animation needs optimal render from the navigator)
     */
    public cursorAnimation: boolean = false;

    /**
     * inciates if we want to hear the backing track
     */
    public playBack: boolean = true;

    /**
     * indicates if the soloist voice should be played during the training or not
     */
    public playSoloist: boolean = false;

    /**
     * Indicates if we need a double preparation before starting playing the music
     */
    public doublePreparation: boolean = true;

    /**
     * indicates if we want to play the metronome
     */
    public metronome: boolean = false;
}