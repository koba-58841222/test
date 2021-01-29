document.getElementById("hello_text").textContent = "はじめてのJavaScript";

var count = 0;
setInterval(function() {
    // 何回目かを数えるために変数countを1ずつ増やす
    count++;
    document.getElementById("hello_text").textContent = "はじめてのJavaScript(" + count + ")"; // 何回目かを文字にまとめて表示する
    var td_array = document.getElementsByTagName("td"); // 200個の要素を持つ配列
    var td_array = document.getElementsByTagName("td");
    var cells = [];
    var index = 0;
    for (var row = 0; row < 20; row++) {
        cells[row] = []; // 配列のそれぞれの要素を配列にする(2次元配列にする)
        for (var col = 0; col < 10; col++) {
            cells[row][col] = td_array[index];
            index++;
        }
    }
}, 1000);