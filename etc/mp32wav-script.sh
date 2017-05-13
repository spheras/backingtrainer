for i in *.mp3; do mpg123 -w "`basename "$i" .mp3`".wav "$i"; done
