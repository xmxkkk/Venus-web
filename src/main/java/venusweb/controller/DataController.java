package venusweb.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import venusweb.dao.LuStrategyMapper;
import venusweb.dao.LuStrategyStockMapper;
import venusweb.model.LuStrategy;
import venusweb.model.LuStrategyStock;

@RestController
@RequestMapping("/data")
public class DataController {
	@Autowired LuStrategyMapper luStrategyMapper;
	@Autowired LuStrategyStockMapper luStrategyStockMapper;
	
	
	/*
	@Autowired PictureMapper pictureMapper;
	@Value("${upload-image-path-dir}")
	String uploadImagePathDir;
	@SuppressWarnings("rawtypes")
	@RequestMapping("/core/{dataid}")
	List core(@PathVariable("dataid")Integer dataid){
		List list=new ArrayList();
		if(dataid==1){
			list=luStrategyMapper.findStatus(1);
			for(int i=0;i<list.size();i++){
				LuStrategy luStrategy=(LuStrategy)list.get(i);
				String img=luStrategy.getImg();
				
				Picture picture=pictureMapper.find(img);
				if(picture!=null)
					luStrategy.setImg(picture.getPath());
			}
		}else if(dataid==2){
			list=luStrategyStockMapper.findStatus(1);
		}
		return list;
	}
	
	@RequestMapping(value = "/getImage/{path}")
	public void getImage(@PathVariable("path")String path,HttpServletRequest request, HttpServletResponse response) {
		FileInputStream fis = null;
		try {
			path=CommonUtil.decode(path);
			
			Picture picture=pictureMapper.findPath(path);
			if(picture!=null){
				if(path.toLowerCase().endsWith("jpg") || path.toLowerCase().endsWith("jpeg")){
					response.setContentType("image/jpeg");
				}else if(path.toLowerCase().endsWith("png")){
					response.setContentType("image/png");
				}
				
				OutputStream out = response.getOutputStream();
				File file = new File(uploadImagePathDir+ File.separator + picture.getPath());
				fis = new FileInputStream(file);
				byte[] b = new byte[fis.available()];
				fis.read(b);
				out.write(b);
				out.flush();
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}
	*/
	
	@RequestMapping("/all/{id}")
	List<Map<String, Object>>  all(@PathVariable("id")Integer id){
		return data(id);
	}
	
	@RequestMapping("/all")
	List<Map<String, Object>>  all(){
		return data(0);
	}
	
	private List<Map<String, Object>>  data(int id){
		List<Map<String, Object>> result=new ArrayList<Map<String,Object>>();
		
		List<LuStrategy> list=null;
		if(id==0){
			list=luStrategyMapper.findStatus(1);
		}else{
			LuStrategy luStrategy=luStrategyMapper.findId(id);
			list=new ArrayList<LuStrategy>();
			list.add(luStrategy);
		}
		for(int i=0;i<list.size();i++){
			Map<String, Object> temp=new HashMap<String, Object>();
			
			LuStrategy luStrategy=list.get(i);
			
			temp.put("i", i);
			temp.put("id", luStrategy.getId());
			temp.put("name", luStrategy.getTitle());
			temp.put("attr", luStrategy.getAttr());
			temp.put("up", luStrategy.getUp());
			temp.put("down", luStrategy.getDown());
			temp.put("flat", luStrategy.getFlat());
			temp.put("img", luStrategy.getImg());
			temp.put("type", luStrategy.getType());

			List<Map<String, Object>> stockList=new ArrayList<Map<String,Object>>();
			
			List<LuStrategyStock> luStrategyStocks=luStrategyStockMapper.findIdStatus(luStrategy.getId(),1);
			if(luStrategyStocks.size()==0){
				continue;
			}
			for(int j=0;j<luStrategyStocks.size();j++){
				LuStrategyStock luStrategyStock=luStrategyStocks.get(j);
				
				Map<String, Object> temp2=new HashMap<String, Object>();
				temp2.put("code", luStrategyStock.getMarket()+luStrategyStock.getCode());
				temp2.put("name", luStrategyStock.getName());
				temp2.put("price", luStrategyStock.getCurr_price());
				temp2.put("change_rate", luStrategyStock.getChange_rate());
				temp2.put("shizhi", luStrategyStock.getZongshizhi());
				temp2.put("shiyinglv", luStrategyStock.getShiyinglvttm());
				
				stockList.add(temp2);
			}
			
			temp.put("stocks", stockList);
			
			result.add(temp);
		}
		
//		return JSON.toJSONString(result);
		return result;
	}
	
}
