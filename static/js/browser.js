/**
  * Created by chenjun on 2016/12/9.
 */
function Browser(){
    var ua = navigator.userAgent.toLowerCase();
    var instance = {};
    instance.system = getSystem();
    instance.isIOS9 = checkIOS9();
    instance.isIOS10 = checkIOS10();
    instance.isBaiduApp = checkBaiduApp();
    instance.isBaiduBrowser = checkBaiduBrowser();
    instance.isWechat = checkWechat();
    instance.isSafari = checkSafari();
		instance.isQQ = checkQQ();
    function getSystem(){
        if(ua.indexOf("android") != -1 || ua.indexOf("linux") != -1){
            return "Android";
        }
        if(ua.indexOf("safari") != -1){
            if(ua.indexOf("windows") != -1){
                return "pc";
            }
            else{
                if(ua.indexOf("mac") != -1){
                    return "ios";
                }
                else{
                    return "Android";
                }
            }
        }
        if(ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("ios") != -1){
            if(ua.indexOf("mac") != -1){
                return "ios";
            }
        }
        if(ua.indexOf("iuc") != -1 && ua.indexOf("mac") != -1){
            return "ios";
        }
        return "pc";
    };

    function checkIOS9(){
        var n = ua.match(/OS [9]_\d[_\d]* like Mac OS X/i);
        if(n == null){
            return false;
        }
        return true;
    };

    function checkIOS10() {
        var n = ua.match(/OS [1][0]_\d[_\d]* like Mac OS X/i)
        if(n == null){
            return false;
        }
        return true;
    };

    function checkSafari() {
        var n = ua.match(/version\/([\d.]+).*safari/);
        var m = ua.indexOf('mqqbrowser/');
        var j = ua.indexOf('baidubrowser');
        // alert(m);
        // if(n != null && m == -1) {
        if(n != null && m == -1 && j == -1) {
            return true;
        }
        return false;
    };
    function checkBaiduApp(){
        if(ua.indexOf("baiduboxapp") != -1){
            return true;
        }
        return false;
    };
    function checkBaiduBrowser(){
        if(ua.indexOf("baidubrowser") != -1){
            return true;
        }
        return false;
    };
    function checkWechat(){
        if(ua.indexOf("micromessenger") != -1){
            return true;
        }
        return false;
    };
		function checkQQ(){
			if(ua.indexOf("QQBrowser") != -1){
				return true;
			}
			return false;
		}
    return instance;
}
