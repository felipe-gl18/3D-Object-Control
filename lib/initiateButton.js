export default class InitiateButton {
    initialazationState
    constructor() {
        this.initialazationState = false
        this.initiateButton = document.createElement('button')
    }

    static init() {
        let button = new InitiateButton()
        button.initiateButton.innerText = "hello"
        button.initiateButton.style.width = "124px"
        button.initiateButton.style.height = "50px"
        document.querySelector('#button').append(button.initiateButton)

        button.initiateButton.addEventListener('click', () => {
            button.initialazationState = !button.initialazationState
            console.log(button.initialazationState);
        })
    }
}