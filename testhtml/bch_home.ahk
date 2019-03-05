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

f14::
	send {f2}

	; select extensions tab
	_click(-685,23)	

	; click refresh
	_click(-295,425)	

	; select a.html tab
	_click(-500,23)	

	; refresh
	_click(-712, 62)	

	; press send button
	;_click(-653, 306)	

	; press button
	;_click(-100, 53)	

	; inspect
	;_rclick(-419, 123)
	;_click(-367, 174)	

	; console
	;_click(1580,43)

	send !{tab}

	_click(32,300)
return

; refresh test page
f13::
	send {f2}

	; select test.html tab
	_click(-500,23)	

	; refresh
	_click(-712, 62)	

	send !{tab}

	_click(32,300)
return


f15::
	send {f2}

	; press button
	_click(-100, 53)
	_click(-100, 53)	

	send !{tab}
return

^f15::
	send {f2}

	; press button
	_click(-100, 53)	

	send !{tab}
return


:*:cex::
send ^a{del}
send chrome extension page
return


`::
Click
return

:*:clg::
send console.log('');{left 3}
return




:*:jp::
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

