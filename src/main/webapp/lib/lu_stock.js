var JSBridge_objCount = 0;
var JSBridge_objArray = new Array();

function JSBridgeObj(a) {
    this.objectJson = JSON.stringify(a);
    this.sendBridgeObject = JSBridgeObj_SendObject
}

function JSBridgeObj_SendObject(){
    JSBridge_objArray[JSBridge_objCount] = this.objectJson;
    var iFrame = document.createElement("IFRAME");
    var JSBridgeSrc = "JSBridge://ReadNotificationWithId="
    if (isLagerThan("3.4.5")) {
        JSBridgeSrc = "JSBridge://bridge.lu.com?ReadNotificationWithId="
    }
    iFrame.setAttribute("src", JSBridgeSrc + JSBridge_objCount);
    document.documentElement.appendChild(iFrame);
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
    JSBridge_objCount++;
    function isLagerThan(version) {
        var flag = false;
        var appVersion
        appVersion = /lufax\/(.*)/g.exec(navigator.userAgent);
        if (appVersion) {
            appVersion = appVersion[1];
        }
        var verReg = /\d\.\d\.\d/
        if (!verReg.test(appVersion)) {
            console.warn('LuWarn: no app version.');
            return false;
        }
        if (!verReg.test(version)) {
            throw new Error('version must be *.*.*');
        }
        var a = appVersion.split('.');
        var b = version.split('.');
        if (+a[0] > +b[0]) {
            flag = true;
        } else if (+a[0] === +b[0]) {
            if (+a[1] > +b[1]) {
                flag = true;
            } else if (+a[1] === +b[1]) {
                if (+a[2] > +b[2]) {
                    flag = true;
                }
            }
        }
        return flag;
    }
}

function JSBridge_getJsonStringForObjectWithId(b) {
    var a = JSBridge_objArray[b];
    JSBridge_objArray[b] = null;
    return a
}

if (!window.Bridge) {
    window.Bridge = {
        call: function(b) {
            if (window.AndroidBridge) {
                window.AndroidBridge.jvWebViewDidCallFromJS(JSON.stringify(b))
            } else {
                var a = new JSBridgeObj(b);
                a.sendBridgeObject()
            }
        }
    }
};