module.exports = {

	ScreenWidth:document.documentElement.clientWidth,
	ScreenHeight:document.documentElement.clientHeight,


	//如果修改导航栏高度和placeHolder高度，一定要修改这里
	NormalContentHeight:document.documentElement.clientHeight/16*15-15,
	PlaceHolderDefaultHeight:15,
	NavHeight: document.documentElement.clientHeight / 16,
	NavWidth: document.documentElement.clientWidth,



	AdHeight:document.documentElement.clientHeight/5,
	LogoSize: 50,
	IconSizeNormal: 30,
	IconSizeBig: 50,
	IconSizeSmall: 15,

	TabBarHeight:100,

	ButtonHeight: document.documentElement.clientHeight*1/9,
	ButtonWidth:document.documentElement.clientWidth * 8 / 9,
	PickerHeight:document.documentElement.clientHeight*2/5,

	InputItemHeight:50,
	InputHeight:40,


	NormalListItemHeight: 50,
	SmallListItemHeight: 10,
	MultiListItemHeight: 40,

	//如若修改Padding，需要修改Squire相关数据
	PagePaddingLeftAndRight:20,
	Padding:5,

	SquareHeight :50,
	SquareWidth:(document.documentElement.clientWidth-40-15)/4,


	TitleFontSize: 20,
	BigFontSize:20,
	NormalFontSize: 15,
	SmallFontSize: 10,
	LittleFontSize:3,

}