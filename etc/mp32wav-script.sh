for i in *.mp3; do mpg321 -w "`basename "$i" .mp3`".wav "$i"; done
