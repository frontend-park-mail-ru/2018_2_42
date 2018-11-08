'use strict';

export default class GameControllers {
    constructor(root) {
        this.root = root;
        this.action = {};

        this.color = "blue";
        this.selectedCell = null;
        this.reachableCells = [];
    }

    start() {
        this.root.addEventListener('mousedown', this._onMousedown.bind(this));
    }

    destroy() {
        this.root.removeEventListener('mousedown', this._onMousedown.bind(this));
    }

    containsAlly(cell){
        const cellInner = cell.firstChild;
        if (cellInner == null) return false
        switch (this.color){
            case "blue":
                return cellInner.classList.contains("blue-back");
            case "red":
                return cellInner.classList.contains("red-back");
            default:
                return false
        }
    }

    markAvailableCells(clicked){
        const parentCell = clicked.parentElement;

        this.markAvailableCell(this.getUpperCell(parentCell))
        this.markAvailableCell(this.getUnderCell(parentCell))
        this.markAvailableCell(this.getLeftCell(parentCell))
        this.markAvailableCell(this.getRightCell(parentCell))
    }

    markAvailableCell(cell){
        if ((cell != null) && !this.containsAlly(cell)) {
            cell.classList.add('near-cell')
            this.reachableCells.push(cell)
        }
    }

    getUpperCell(cell){
        return document.getElementById((+cell.getAttribute("id") - 7) + '')
    }

    getUnderCell(cell){
        return document.getElementById((+cell.getAttribute("id") + 7) + '')
    }

    getLeftCell(cell){
        return document.getElementById((+cell.getAttribute("id") - 1) + '')
    }

    getRightCell(cell){
        return document.getElementById((+cell.getAttribute("id") + 1) + '')
    }
    
    /**
     * Обработчик события
     * @param  {string} type
     * @param  {MouseEvent} event
     */
    _onMousedown(event) {
        const clicked = event.target
        
        if (this.reachableCells.includes(clicked)) {
            // bus.emit(unit moves!)
            console.log("send move action to server");
        }

        if (this.reachableCells) {
            this.reachableCells.forEach(cell=>{
                cell.classList.remove("near-cell")
            });
        }
        
        if (this.selectedCell) {
            this.selectedCell.classList.remove("selected-cell");
        }

        this.reachableCells = [];
        this.selectedCell = null;

        if (clicked.classList.contains("unit") && this.containsAlly(clicked.parentElement)) {
            const parentCell = clicked.parentElement;
            parentCell.classList.add('selected-cell')
            this.selectedCell = parentCell;

            this.markAvailableCells(clicked)
        }
    }
}