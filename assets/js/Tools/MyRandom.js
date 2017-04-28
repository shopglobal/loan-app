export default class MyRandom {

	static generateString(len = 10) {

		let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789';
		let pwd = '';
		for (let i = 0; i < len; i++) {
			pwd += chars.charAt(Math.floor(Math.random() * 62));
		}
		return pwd;
	}

	static generateNum(len = 4){
		return Math.random()*Math.pow(10 , len);
	}
}