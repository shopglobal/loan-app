module.exports = {

	ScreenWidth:document.documentElement.clientWidth,
	ScreenHeight:document.documentElement.clientHeight,

	AdHeight:document.documentElement.clientHeight/5,
	LogoSize: 50,
	IconSizeNormal: 30,
	IconSizeBig: 50,
	IconSizeSmall: 15,

	/*有关TabBar
	* 如果修改TabBar样式一定修改styleTabBar*/
	TabBarHeight:60,

	ButtonHeight: document.documentElement.clientHeight/9,
	ButtonWidth:document.documentElement.clientWidth * 8 / 9,
	PickerHeight:40,

	/*有关ListItem*/
	InputItemHeight:40,
	InputHeight:30,

	NormalListItemHeight: 50,
	SmallListItemHeight: 10,
	MultiListItemHeight: 40,

  //如果修改导航栏高度和Padding高度，一定要修改这里
  NormalContentHeight:document.documentElement.clientHeight/14*13,
  NavHeight: document.documentElement.clientHeight / 14,
  NavWidth: document.documentElement.clientWidth,


	/*Padding*/
	//如若修改Padding，需要修改Squire和NormalContentHeight相关数据
	PagePaddingLeftAndRight:20,
	Padding:5,

	/*有关首页热门贷款金额方块*/
	SquareHeight :50,
	SquareWidth:(document.documentElement.clientWidth-40-15)/4,

  PlaceHolderDefaultHeight:15,

	/*有关字体*/
	TitleFontSize: 20,
	BigFontSize:20,
	NormalFontSize: 15,
	SmallFontSize: 10,
	LittleFontSize:3,

}
