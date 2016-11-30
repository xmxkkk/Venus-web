package venusweb.help;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.codec.binary.Base64;

public class CommonUtil {
	
	public static String decode(String str) {
        try {
			return new String(Base64.decodeBase64(str.getBytes("utf-8")));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
        return null;
    }  
  
    public static String encode(String str) {
    	try {
			return new String(Base64.encodeBase64(str.getBytes()),"utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
    	return null;
    }  
	public final static String md5(String s) {
        char hexDigits[]={'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};       
        try {
            byte[] btInput = s.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
	public final static String randMd5(){
		String salt=String.valueOf(Math.random())+String.valueOf(Math.random());
		return md5(salt);
	}
	
	public static boolean compareExpressionString(String value,String express){
		if(value==null)return false;
		String orString[]=express.split("\\|\\|");
		List<Boolean> list=new ArrayList<Boolean>();
		for(int i=0;i<orString.length;i++){
			orString[i]=orString[i].trim();
			if(orString[i].contains("||")){
				list.add(compareExpressionString(value, orString[i]));
			}else{
				List<Boolean> tempList=new ArrayList<Boolean>();
				String[] andString=orString[i].split("&&");
				for(int j=0;j<andString.length;j++){
					andString[j]=andString[j].trim();
					if(andString[j].startsWith("!=")){
						if(!value.equals(andString[j].replace("!=", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else if(andString[j].startsWith("=")){
						if(value.equals(andString[j].replace("=", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else if(andString[j].startsWith("IN")){
						if(value.contains(andString[j].replace("IN", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else if(andString[j].startsWith("!IN")){
						if(!value.contains(andString[j].replace("!IN", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else{
						throw new RuntimeException("表达式错误");
					}
				}
				boolean tempResult=true;
				for(int j=0;j<tempList.size();j++){
					if(tempList.get(j)==false){
						tempResult=false;break;
					}
				}
				list.add(tempResult);
			}
		}
		boolean tempResult=false;
		for(int i=0;i<list.size();i++){
			if(list.get(i)){
				tempResult=true;
			}
		}
		
		return tempResult;
	}
	public static boolean compareExpressionDouble(Double value,String express){
		if(value==null)return false;
		
		String orString[]=express.split("\\|\\|");
		List<Boolean> list=new ArrayList<Boolean>();
		for(int i=0;i<orString.length;i++){
			orString[i]=orString[i].trim();
			if(orString[i].contains("||")){
				list.add(compareExpressionDouble(value, orString[i]));
			}else{
				List<Boolean> tempList=new ArrayList<Boolean>();
				String[] andString=orString[i].split("&&");
				for(int j=0;j<andString.length;j++){
					andString[j]=andString[j].trim();
					if(andString[j].startsWith("<=")){
						if(value<=Double.parseDouble(andString[j].replace("<=", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else if(andString[j].startsWith(">=")){
						if(value>=Double.parseDouble(andString[j].replace(">=", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else if(andString[j].startsWith("<")){
						if(value<Double.parseDouble(andString[j].replace("<", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else if(andString[j].startsWith(">")){
						if(value>Double.parseDouble(andString[j].replace(">", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else if(andString[j].startsWith("!=")){
						if(value!=Double.parseDouble(andString[j].replace("!=", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else if(andString[j].startsWith("=")){
						if(value==Double.parseDouble(andString[j].replace("=", ""))){
							tempList.add(true);
						}else{
							tempList.add(false);
						}
					}else{
						throw new RuntimeException("表达式错误");
					}
				}
				boolean tempResult=true;
				for(int j=0;j<tempList.size();j++){
					if(tempList.get(j)==false){
						tempResult=false;break;
					}
				}
				list.add(tempResult);
			}
		}
		boolean tempResult=false;
		for(int i=0;i<list.size();i++){
			if(list.get(i)){
				tempResult=true;
			}
		}
		
		return tempResult;
	}
	
	public static Map<String, Double> cast(Map<String, Object> param){
		Map<String, Double> paramResult=new HashMap<String, Double>();
		Iterator<String> it=param.keySet().iterator();
		while(it.hasNext()){
			String key=it.next();
			paramResult.put(key, new Double(param.get(key).toString()));
		}
		return paramResult;
	}
}
