conectar() {
    node server.js
}
creardb() {
    sudo mysql -u root -p < dbSetup.sql
}
abrir() {
    url="http://localhost:4953"
    width=500
    height=500
    xdg-open "$url" &
    sleep 1
    window_id=$(xdotool search --sync --onlyvisible --class "firefox")
    xdotool windowsize "$window_id" "$width" "$height"   
}

if [ compilar ]; then
    conectar
fi