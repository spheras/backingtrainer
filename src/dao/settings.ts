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
     * high quality requires a good performance
     */
    public highQualitySound: boolean = false;

    /**
     * indicates if the soloist voice should be played during the training or not
     */
    public playSoloist:boolean=false;
}