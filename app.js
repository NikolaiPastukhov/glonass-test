const firstTable = document.querySelector('.table-first tbody');
const secondTable = document.querySelector('.table-second tbody');
const tableResult = document.querySelector('.table-result tbody');
const addRowBtnEl = document.querySelectorAll('.add-tr ');
const calculateBtn = document.querySelector('.calculate');
let currentLength;

function addRowTable(e) {
    let tdInputX = document.createElement('input');
    tdInputX.className = 'input input-x';
    let tdInputY = document.createElement('input');
    tdInputY.className = 'input input-y';
    let trElement = document.createElement('tr');
    let tdElementX = document.createElement('td');
    tdElementX.className = 'td td-x';
    let tdElementY = document.createElement('td');
    tdElementY.className = 'td td-y';
    let tdElementDelete = document.createElement('td');
    tdElementDelete.innerHTML = "Delete";
    tdElementDelete.className = 'td-delete';


    e.target.parentElement.querySelector('tbody').append(trElement);
    trElement.append(tdElementX);
    trElement.append(tdElementY);
    e.target.parentElement.querySelectorAll('.td-x').forEach(el => el.appendChild(tdInputX));
    e.target.parentElement.querySelectorAll('.td-y').forEach(el => el.appendChild(tdInputY));
    trElement.append(tdElementDelete);

    function deleteRowTable(e) {
        e.target.parentElement.remove()
    }

    document.querySelectorAll('.td-delete').forEach(el => el.addEventListener('click', deleteRowTable))
}

function calculate(e) {
    e.target.parentElement.querySelectorAll('tbody tr').forEach(el => el.remove())
    if (firstTable.rows.length < secondTable.rows.length) {
        currentLength = firstTable.rows.length
    } else {
        currentLength = secondTable.rows.length
    }
    for (let i = 0; currentLength > tableResult.rows.length; i++) {
        let trElement = document.createElement('tr');
        let tdInputX = document.createElement('input');
        tdInputX.className = 'input input-x';
        tdInputX.setAttribute('disabled', 'disabled');
        let tdInputY = document.createElement('input');
        tdInputY.className = 'input input-y';
        tdInputY.setAttribute('disabled', 'disabled');
        let tdElementX = document.createElement('td');
        tdElementX.className = 'td td-x'
        let tdElementY = document.createElement('td')
        tdElementY.className = 'td td-y'
        e.target.parentElement.querySelector('tbody').append(trElement);
        trElement.append(tdElementX);
        trElement.append(tdElementY);
        e.target.parentElement.querySelectorAll('.td-x').forEach(el => el.appendChild(tdInputX));
        e.target.parentElement.querySelectorAll('.td-y').forEach(el => el.appendChild(tdInputY));

        tableResult.rows[i].querySelector('.input-x').value = (+firstTable.rows[i].querySelector('.input-x').value + +secondTable.rows[i].querySelector('.input-x').value) / 2;
        tableResult.rows[i].querySelector('.input-y').value = (+firstTable.rows[i].querySelector('.input-y').value + +secondTable.rows[i].querySelector('.input-y').value) / 2;
    }
    drawGraphs()
}

calculateBtn.addEventListener('click', calculate)
addRowBtnEl.forEach(el => el.addEventListener('click', addRowTable));

function drawGraph(canvasEl, tableEl) {
    const center = canvasEl.clientWidth / 2
    let ctx = canvasEl.getContext("2d");
    ctx.beginPath()
    ctx.strokeStyle = "blue"
    Array.from(tableEl.rows).forEach(row => {

        const x = center + row.querySelector('.input-x').value * scale
        const y = center - row.querySelector('.input-y').value * scale

        ctx.lineTo(x, y);
        ctx.moveTo(x, y);

    })
    ctx.stroke();
    ctx.closePath();
}

function drawGraphs() {
    initCanvas()
    drawGraph(document.querySelector('#canvas-table-first'), firstTable);
    drawGraph(document.querySelector('#canvas-table-second'), secondTable);
    drawGraph(document.querySelector('#canvas-table-result'), tableResult);
}


const scale = 25;

function initCanvas() {
    let canvas = document.querySelectorAll(".canvas");
    canvas.forEach(el => {
        // Поля для графиков
        let canvasSide = el.clientWidth
        let ctx = el.getContext("2d");
        ctx.clearRect(0, 0, canvasSide, canvasSide)


        const axis = Math.round(canvasSide / scale / 2) * scale;

        ctx.beginPath();
        ctx.strokeStyle = 'white';
        for (let i = 0; i <= canvasSide; i = i + scale) {
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvasSide);
            ctx.moveTo(0, i);
            ctx.lineTo(canvasSide, i);
        }

        ctx.stroke();
        ctx.closePath();

        // Рисуем оси
        ctx.beginPath()
        ctx.strokeStyle = 'black';

        ctx.moveTo(axis, 0)
        ctx.lineTo(axis, canvasSide);

        ctx.moveTo(0, axis);
        ctx.lineTo(canvasSide, axis);
        ctx.font = "15px Arial";
        ctx.fillText('0', canvasSide / 2 - 10 , canvasSide / 2 + 15)
        ctx.fillText('x', canvasSide - 15, canvasSide / 2 - 10)
        ctx.fillText('y', canvasSide / 2 + 10  , 15)


        ctx.stroke();
        ctx.closePath();

        // Рисуем риски
        ctx.beginPath();
        ctx.strokeStyle = 'black';

        for (let i = scale; i < canvasSide / 2; i += scale) {
            ctx.fillText((i - axis) / scale, i - 8, axis + 20)
            ctx.moveTo(i, axis + 5);
            ctx.lineTo(i, axis - 5);
            ctx.fillText(-(i - axis) / scale, canvasSide - i - 2, axis + 20)
            ctx.moveTo(canvasSide - i, axis + 5)
            ctx.lineTo(canvasSide - i, axis - 5)

            ctx.fillText(-(i - axis) / scale, axis - 15, i + 5)
            ctx.moveTo(axis + 5, i);
            ctx.lineTo(axis - 5, i);
            ctx.fillText((i - axis) / scale, axis - 20, canvasSide - i + 5)
            ctx.moveTo(axis + 5, canvasSide - i)
            ctx.lineTo(axis - 5, canvasSide - i)
        }

        ctx.stroke();
        ctx.closePath();

    })

}

initCanvas()