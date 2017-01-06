package venusweb.controller;

import java.io.File;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import venusweb.dao.LuStrategyMapper;
import venusweb.dao.LuStrategyStockMapper;
import venusweb.model.LuStrategy;
import venusweb.model.LuStrategyStock;

@RestController
public class DataController {
	@Autowired LuStrategyMapper luStrategyMapper;
	@Autowired LuStrategyStockMapper luStrategyStockMapper;
	@Value("${fetch-task-image-path}")
	String imagePath;
	
	@RequestMapping("/data/all/{id}")
	List<Map<String, Object>>  all(@PathVariable("id")Integer id,HttpServletRequest request, HttpServletResponse response){
		return data(id,request);
	}
	
	@RequestMapping("/data/all")
	List<Map<String, Object>>  all(HttpServletRequest request, HttpServletResponse response){
		return data(0,request);
	}
	
	private List<Map<String, Object>>  data(int id,HttpServletRequest request){
		String path=request.getContextPath();
		
		DecimalFormat df = new DecimalFormat("######0.00");   
		
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
			
			String img=luStrategy.getImg();
			if(img==null || img.equals("null")){
				img="./img/default.jpg";
			}else if(img.startsWith("./img")){
				
			}else if(img.startsWith("/Uploads/Picture")){
				img=imagePath+luStrategy.getImg();
				if(new File(img).exists()){
					img=path+luStrategy.getImg();
				}else{
					img="./img/default.jpg";
				}
			}
			
			temp.put("i", i);
			temp.put("id", luStrategy.getId());
			temp.put("name", luStrategy.getTitle());
			
			String attr=luStrategy.getAttr();
//			if(attr.length()>50){
//				attr=attr.substring(0,50)+"<span ng-click=\"go('attr',{id:\""+luStrategy.getId()+"\"})\">查看详情&gt&gt</span>";
//			}
			
			temp.put("attr", attr);
			temp.put("up", luStrategy.getUp());
			temp.put("down", luStrategy.getDown());
			temp.put("flat", luStrategy.getFlat());
			temp.put("img", img);
			temp.put("type", luStrategy.getType());
			temp.put("total_change_rate", df.format(luStrategy.getTotal_change_rate()));
			

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
				temp2.put("price", df.format(luStrategyStock.getCurr_price()==null?0:luStrategyStock.getCurr_price()));
				temp2.put("change_rate", df.format(luStrategyStock.getChange_rate()==null?0:luStrategyStock.getChange_rate()));
				temp2.put("shizhi", luStrategyStock.getZongshizhi());
				temp2.put("shiyinglv", luStrategyStock.getShiyinglvttm());
				temp2.put("total_change_rate", df.format(luStrategyStock.getTotal_change_rate()==null?0:luStrategyStock.getTotal_change_rate()));
				temp2.put("join_date", luStrategyStock.getJoin_date());
				temp2.put("join_price", df.format(luStrategyStock.getJoin_price()==null?0:luStrategyStock.getJoin_price()));
				temp2.put("join_date", luStrategyStock.getJoin_date());
				temp2.put("shijinglv", luStrategyStock.getShijinglv());
				temp2.put("roe", luStrategyStock.getRoe());
				
				stockList.add(temp2);
			}
			
			temp.put("stocks", stockList);
			
			result.add(temp);
		}
		
		return result;
	}
	
}
