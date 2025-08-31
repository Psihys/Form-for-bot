class circleBox{
    constructor(option){
        this.$el = document.querySelector(option.selector)
    }

    hide(){
        this.$el.style.display = 'none'
    }

    show(){
        this.$el.style.display = 'block'
    }
}

class circleItem extends circleBox{
    constructor(option){
        super(option)
        this.$el.style.width = option.width + 'px'
        this.$el.style.height = option.height + 'px'
        this.$el.style.borderRadius = option.radius + '%'
        this.$el.style.background = option.color
    }
}

const circleRed = new circleItem({
    selector: '#circleRed',
    width: 200,
    height: 200,
    radius: 50,
    color: 'red'
})

const circleBlue = new circleItem({
    selector: '#circleBlue',
    width: 200,
    height: 200,
    radius: 50,
    color: 'blue'
})

const circleGreen = new circleItem({
    selector: '#circleGreen',
    width: 200,
    height: 200,
    radius: 50,
    color: 'green'
})

const button = document.getElementById('hideButton')
button.addEventListener('click', function(){
    circleRed.hide()
    circleBlue.hide()
    circleGreen.hide()
})

const button2 = document.getElementById('showButton')
button2.addEventListener('click', function(){
    circleRed.show()
    circleBlue.show()
    circleGreen.show()
})