

//query ile id verilen html etiketlerine ulaşılması
const blocks = document.querySelectorAll(".block");
const playerText = document.getElementById("player");
const errorText = document.getElementById("error");
let player = "S";
let gameOver = false;
let winner;


function startGame() {//fonks. başlangıcı
    //player ı text cıontext ile html e basma
    playerText.textContent = `${player}'s Turn !`

    //foreach ile blocklara click eventi atanıp değerleri chooseArea gönderir
    blocks.forEach(block => block.addEventListener("click", () => chooseArea(block)))
}


function chooseArea(block) {
    if (block.textContent === "") {
        block.textContent = player;
        //block a basanoyuncu O ise border değerini değiştir
        if (player === "O") {
            block.style.color = "red"
        }
        turnPlayer();//sıra değiştir
    } else {
        //boş olmayan yere tıklanırsa uyarı
        errorText.textContent = "Heyy, it's not empty "
        block.style.border = "2px solid red"
        setTimeout(() => {//bekleme süresi
            errorText.textContent = ""
            block.style.border = "1px solid black"
        }, 2500)
    }

    checkWin();//win i çalıştır
    checkTie();//beraberliği çalıştır

    if (gameOver) {//oyun sonu
        playerText.textContent = `Game is over, ${winner} Won`;
        blocks.forEach(block => block.style.pointerEvents = 'none');
    }
}
//sıra değiştirme
function turnPlayer() {
    //player sise o yap turn u text conteck ile front a bas
    if (player === "S") {
        player = "O";
        playerText.textContent = `${player}'s Turn !`
        return;
    } else if (player === "O") {
        player = "S";
        playerText.textContent = `${player}'s Turn !`

    }
}

//kazanan bulma
function checkWin() {
    // win

    //duruma göre her oyundan sonra kontrol sağla
    checkRows()
    checkColumns()
    checkDiagonals()
}

///beraberllik
function checkTie() {
    // tie
    const values = [];

    blocks.forEach(block => values.push(block.textContent))
    if (!values.includes("")) {
        playerText.textContent = "Togetherness !";
        blocks.forEach(block => block.style.pointerEvents = 'none');
    }
}

//
function checkRows() {
    // check rows

    //ilk satır block 0-1-2 indexlerin eşitlik kontrolü
    let row1 = blocks[0].textContent === blocks[1].textContent &&
        blocks[0].textContent === blocks[2].textContent && blocks[0].textContent !== "";//içerisi de boş olmamalı

        //İkinci satır block 3-4-5 indexlerin eşitlik kontrolü
    let row2 = blocks[3].textContent === blocks[4].textContent &&
        blocks[3].textContent === blocks[5].textContent && blocks[3].textContent !== "";

        //üçüncü satır block 6-7-8 indexlerin eşitlik kontrolü
    let row3 = blocks[6].textContent === blocks[7].textContent &&
        blocks[6].textContent === blocks[8].textContent && blocks[6].textContent !== "";

    if (row1 || row2 || row3) {
        gameOver = true
    }
    if (row1) return winner = blocks[0].textContent
    if (row2) return winner = blocks[3].textContent
    if (row3) return winner = blocks[6].textContent
}

//sutün kontrolü
function checkColumns() {
    // check cols
    //ilk sutün block0-3-6 indexlerin eşitlik kontrolü
    let col1 = blocks[0].textContent === blocks[3].textContent &&
        blocks[0].textContent === blocks[6].textContent && blocks[0].textContent !== "";

        //ikinci sutün block 1-4-7 indexlerin eşitlik kontrolü
    let col2 = blocks[1].textContent === blocks[4].textContent &&
        blocks[1].textContent === blocks[7].textContent && blocks[1].textContent !== "";
        //üçüncü sutün block2-5-8 indexlerin eşitlik kontrolü
    let col3 = blocks[2].textContent === blocks[5].textContent &&
        blocks[2].textContent === blocks[8].textContent && blocks[2].textContent !== ""

    if (col1 || col2 || col3) {
        gameOver = true
    }
    if (col1) return winner = blocks[0].textContent
    if (col2) return winner = blocks[1].textContent
    if (col3) return winner = blocks[2].textContent
}


//2 adet çapraz win durumu içim
function checkDiagonals() {
    // check diag
    let dia1 = blocks[0].textContent === blocks[4].textContent &&
        blocks[0].textContent === blocks[8].textContent && blocks[0].textContent !== ""
    let dia2 = blocks[2].textContent === blocks[4].textContent &&
        blocks[2].textContent === blocks[6].textContent && blocks[2].textContent !== ""

    if (dia1 || dia2) {
        gameOver = true
    }
    if (dia1) return winner = blocks[0].textContent
    if (dia2) return winner = blocks[2].textContent
}
function Refresh(){
    window.location.reload();
}

startGame();