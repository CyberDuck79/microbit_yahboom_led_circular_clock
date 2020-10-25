pins.set_pull(DigitalPin.P2, PinPullMode.PULL_NONE)
strip = neopixel.create(DigitalPin.P2, 24, NeoPixelMode.RGB)
strip.show_color(neopixel.colors(NeoPixelColors.BLACK))
strip.set_brightness(30)
strip.show()
basic.show_string("HH:")
hours: int = 15
basic.show_number(hours)
while not (input.button_is_pressed(Button.A)):
    if input.button_is_pressed(Button.B):
        hours += 1
        if hours == 24:
            hours = 0
        basic.show_number(hours)
Hours_led: int = (hours % 12) + 12
strip.set_pixel_color(Hours_led, neopixel.colors(NeoPixelColors.ORANGE))
basic.show_string(":MM")
minutes: int = 23
basic.show_number(minutes)
while not (input.button_is_pressed(Button.A)):
    if input.button_is_pressed(Button.B):
        minutes += 1
        if minutes == 60:
            minutes = 0
        basic.show_number(minutes)
minutes_led: int = (Math.round(minutes / 2.5) + 12) % 24
strip.set_pixel_color(minutes_led, neopixel.colors(NeoPixelColors.INDIGO))
strip.show()

def on_forever():
    global minutes, hours, minutes_led, Hours_led
    for index in range(24):
        led_index = (index + 12) % 24
        if led_index != Hours_led and led_index != minutes_led:
            strip.set_pixel_color(led_index, neopixel.colors(NeoPixelColors.WHITE))
        strip.show()
        control.wait_micros(2500000)
        if led_index != Hours_led and led_index != minutes_led:
            strip.set_pixel_color(led_index, neopixel.colors(NeoPixelColors.BLACK))
    strip.set_pixel_color(Hours_led, neopixel.colors(NeoPixelColors.BLACK))
    strip.set_pixel_color(minutes_led, neopixel.colors(NeoPixelColors.BLACK))
    minutes += 1
    if minutes == 60:
        minutes = 0
        hours += 1
        if hours == 24:
            hours = 0
    Hours_led = (hours % 12) + 12
    minutes_led = (Math.round(minutes / 2.5) + 12) % 24
    if Hours_led == minutes_led:
        strip.set_pixel_color(Hours_led, neopixel.colors(NeoPixelColors.VIOLET))
    else:
        strip.set_pixel_color(Hours_led, neopixel.colors(NeoPixelColors.ORANGE))
        strip.set_pixel_color(minutes_led, neopixel.colors(NeoPixelColors.INDIGO))
    strip.show()
basic.forever(on_forever)
