_move(x,y,delay=200) {
   CoordMode, Mouse, Screen
   MouseMove, %x%, %y%, 5
   sleep %delay%
}

_click(x,y,delay=200) {
   CoordMode, Mouse, Screen
   MouseMove, %x%, %y%, 5
   Click
   sleep %delay%
}

_rclick(x,y,delay=200) {
   CoordMode, Mouse, Screen
   MouseMove, %x%, %y%, 5
   Click, right
   sleep %delay%
}

refresh_A_tab() {
    ; select a.html tab
	_click(-500,23)	

	; refresh
	_click(-712, 62)	
}

refresh_extension() {
    ; select extensions tab
	_click(-685,23)	

	; click refresh
	_click(-295,425)	
}

refresh_purse() {	
	_click(27,111) ;select chrome
	_click(187,13) ;select tab
	_click(1309,128) ;select my orders
	sleep 2000
	_click(515,502) ;select order
	sleep 3000
	_click(1326,408) ;select complete order
}

refresh_youtube() {	
	_click(27,111) ;select chrome
	_click(187,13) ;select tab
	_click(144,51) ;select refresh
}

f14::
	send {f2}

	; give browserfy time
    sleep 200

    refresh_extension()

	;refresh_A_tab()

	; press send button
	;_click(-653, 306)	

	; press extension button
        ;sleep 500
	;_click(-100, 53)	

	; inspect
	;_rclick(-419, 123)
	;_click(-367, 174)	

	; console
	;_click(1580,43)

	;_click(32,200)

	; editbox
	;_click(-683,442)
	;send 23

	;refresh_purse()
	;refresh_youtube()
	reload_test_page()

	send !{tab}

return

reload_test_page() {
	; select test.html tab
	_click(-500,23)	

	; refresh
	_click(-712, 62)	
}

; refresh test page
f13::
	send {f2}

	reload_test_page()

	send !{tab}

	;_click(32,300)
return

inspect() {
	_rclick(-184,272)
	_click(-119,317)
	_click(-1350,94)
}

backup() {
	_click(-323,150)
}

f15::
	send {f2}

	; press button
	_click(-100, 53)
	sleep 100
	_click(-100, 53)	

	; press refill 
	;_click(-154,154)

	;inspect()
        backup()

	send !{tab}
return

^f15::
	send {f2}

	; press button
	_click(-100, 53)	

	send !{tab}
return


:*:brd::
send border:1px solid red;
return


`::
Click
return

:*:clg::
send console.log('');{left 3}
return


:*:stl::
send style="" {left 2}
return




:*:ljp::
send console.log(JSON.stringify());{left 3}
return

f4::^c
f5::^v

^f5::
send ^a^v
return

^f4::
send ^a^c
return

f19::
send ^s
Reload
return

