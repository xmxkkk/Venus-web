package venusweb.help;

import java.util.List;
import java.util.Map;

public class StringUtil {
	@SuppressWarnings("rawtypes")
	public static boolean isBlank(Object obj){
		if(obj==null){
			return true;
		}
		
		if(obj instanceof List){
			return ((List) obj).size()==0;
		}else if(obj instanceof Map){
			return ((Map) obj).size()==0;
		}else if(obj instanceof String){
			return obj.equals("");
		}
		return false; 
	}
	
	public static String template(String template,List<String> params){
		for(int i=0;i<params.size();i++){
			template=template.replace("{"+i+"}", params.get(i));
		}
		return template;
	}
}
