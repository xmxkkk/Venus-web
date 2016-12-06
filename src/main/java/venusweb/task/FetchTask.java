package venusweb.task;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.jsoup.helper.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.alibaba.fastjson.JSONArray;

import venusweb.dao.LuStrategyMapper;
import venusweb.dao.LuStrategyStockMapper;
import venusweb.help.URLUtil;
import venusweb.model.LuStrategy;
import venusweb.model.LuStrategyStock;

@Component
public class FetchTask {
	Logger logger=Logger.getLogger(FetchTask.class);
	@Value("${fetch-task-enable}")
	boolean enable;
	@Value("${fetch-task-url}")
	String url;
	@Value("${fetch-task-image-path}")
	String imagePath;
	@Value("${fetch-task-image-baseurl}")
	String imageBaseUrl;
	@Autowired
	LuStrategyMapper luStrategyMapper;
	@Autowired
	LuStrategyStockMapper luStrategyStockMapper;
	
	@Autowired
	URLUtil URLUtil;
	@Scheduled(fixedRate = 60000)
	public void fetch() {
		logger.info("[start]"+enable+","+url);
		try{
			if(enable){
				List<String> params=new ArrayList<String>();
				params.add(String.valueOf(1));
				
				String json=URLUtil.url2str(venusweb.help.StringUtil.template(url,params), false);
				if(!StringUtil.isBlank(json)){
					
					List<LuStrategy> luStrategies=JSONArray.parseArray(json,LuStrategy.class);
					int cnt=0;
					for(int i=0;i<luStrategies.size();i++){
						LuStrategy luStrategy=luStrategies.get(i);
						int id=luStrategy.getId();
						if(id<=0)continue;
						
						LuStrategy luStrategyDb=luStrategyMapper.findId(id);
						if(luStrategyDb==null){
							luStrategyMapper.insert(luStrategy);
						}else{
							luStrategyMapper.update(luStrategy);
						}
						cnt++;
					}
					
					List<LuStrategy> allLuStrategies=luStrategyMapper.find();
					if(cnt>0){
						for(int i=0;i<allLuStrategies.size();i++){
							boolean isDel=true;
							LuStrategy dbLuStrategies=allLuStrategies.get(i);
							
							for(int j=0;j<luStrategies.size();j++){
								LuStrategy luStrategy=luStrategies.get(j);
								if(luStrategy.getId()==dbLuStrategies.getId()){
									isDel=false;
									break;
								}
							}
							if(isDel){
								luStrategyMapper.delete(dbLuStrategies.getId());
							}
						}
					}
					
					allLuStrategies=luStrategyMapper.find();
					for(int i=0;i<allLuStrategies.size();i++){
						String img=allLuStrategies.get(i).getImg();
						String url=imageBaseUrl+allLuStrategies.get(i).getImg();
						
						String filepath=imagePath+img;
						
						logger.info("[message]url="+url+",filepath="+filepath);
						
						File file=new File(filepath);
						if(!file.exists()){
							InputStream is=null;
							try{
								is=new URL(url).openConnection().getInputStream();
							}catch(Exception e){
								e.printStackTrace();
								continue;
							}
							
							String parentPath=file.getParent();
							if(!new File(parentPath).exists()){
								new File(parentPath).mkdirs();
							}
							
							file.createNewFile();
							FileOutputStream fos=new FileOutputStream(imagePath+img,true);
							byte[] buf=new byte[102400];
							int len=0;
							while((len=is.read(buf, 0, 102400))>0){
								fos.write(buf, 0, len);
							}
							is.close();
							fos.close();
						}
					}
				}
				
				params.clear();
				params.add(String.valueOf(2));
				json=URLUtil.url2str(venusweb.help.StringUtil.template(url,params), false);
				if(!StringUtil.isBlank(json)){
					List<LuStrategyStock> luStrategyStocks=JSONArray.parseArray(json,LuStrategyStock.class);
					int cnt=0;
					for(int i=0;i<luStrategyStocks.size();i++){
						LuStrategyStock luStrategyStock=luStrategyStocks.get(i);
						int id=luStrategyStock.getId();
						if(id<=0)continue;
						
						LuStrategyStock luStrategyStockDb=luStrategyStockMapper.findIdCode(luStrategyStock.getId(),luStrategyStock.getCode());
						if(luStrategyStockDb==null){
							luStrategyStockMapper.insert(luStrategyStock);
						}else{
							luStrategyStockMapper.update(luStrategyStock);
						}
						cnt++;
					}
					if(cnt>0){
						List<LuStrategyStock> allLuStrategyStocks=luStrategyStockMapper.find();
						for(int i=0;i<allLuStrategyStocks.size();i++){
							boolean isDel=true;
							LuStrategyStock dbLuStrategyStock=allLuStrategyStocks.get(i);
							
							for(int j=0;j<luStrategyStocks.size();j++){
								LuStrategyStock luStrategyStock=luStrategyStocks.get(j);
								if(dbLuStrategyStock.getId()==luStrategyStock.getId() && dbLuStrategyStock.getCode().equals(luStrategyStock.getCode())){
									isDel=false;
									break;
								}
							}
							if(isDel){
								luStrategyStockMapper.deleteIdCode(dbLuStrategyStock.getId(), dbLuStrategyStock.getCode());
							}
						}
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
			logger.error("[except]"+e.getMessage());
		}
		logger.info("[end]");
	}
}
