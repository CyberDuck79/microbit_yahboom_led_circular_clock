pins.setPull(DigitalPin.P2, PinPullMode.PullNone)
let strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
strip.showColor(neopixel.colors(NeoPixelColors.Black))
strip.setBrightness(30)
strip.show()
basic.showString("HH:")
let hours = 15
basic.showNumber(hours)
while (!input.buttonIsPressed(Button.A)) {
    if (input.buttonIsPressed(Button.B)) {
        hours += 1
        if (hours == 24) {
            hours = 0
        }
        
        basic.showNumber(hours)
    }
    
}
let Hours_led = hours % 12 + 12
strip.setPixelColor(Hours_led, neopixel.colors(NeoPixelColors.Orange))
basic.showString(":MM")
let minutes = 23
basic.showNumber(minutes)
while (!input.buttonIsPressed(Button.A)) {
    if (input.buttonIsPressed(Button.B)) {
        minutes += 1
        if (minutes == 60) {
            minutes = 0
        }
        
        basic.showNumber(minutes)
    }
    
}
let minutes_led = (Math.round(minutes / 2.5) + 12) % 24
strip.setPixelColor(minutes_led, neopixel.colors(NeoPixelColors.Indigo))
strip.show()
basic.forever(function on_forever() {
    let led_index: number;
    
    for (let index = 0; index < 24; index++) {
        led_index = (index + 12) % 24
        if (led_index != Hours_led && led_index != minutes_led) {
            strip.setPixelColor(led_index, neopixel.colors(NeoPixelColors.White))
        }
        
        strip.show()
        control.waitMicros(2500000)
        if (led_index != Hours_led && led_index != minutes_led) {
            strip.setPixelColor(led_index, neopixel.colors(NeoPixelColors.Black))
        }
        
    }
    strip.setPixelColor(Hours_led, neopixel.colors(NeoPixelColors.Black))
    strip.setPixelColor(minutes_led, neopixel.colors(NeoPixelColors.Black))
    minutes += 1
    if (minutes == 60) {
        minutes = 0
        hours += 1
        if (hours == 24) {
            hours = 0
        }
        
    }
    
    Hours_led = hours % 12 + 12
    minutes_led = (Math.round(minutes / 2.5) + 12) % 24
    if (Hours_led == minutes_led) {
        strip.setPixelColor(Hours_led, neopixel.colors(NeoPixelColors.Violet))
    } else {
        strip.setPixelColor(Hours_led, neopixel.colors(NeoPixelColors.Orange))
        strip.setPixelColor(minutes_led, neopixel.colors(NeoPixelColors.Indigo))
    }
    
    strip.show()
})
