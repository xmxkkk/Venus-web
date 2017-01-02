package venusweb.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

import venusweb.model.LuStrategyStock;

@Component
@Mapper
public interface LuStrategyStockMapper {
	
	@Select("select * from lu_strategy_stock where id=#{id} and status=#{status}")
	List<LuStrategyStock> findIdStatus(@Param("id")int id,@Param("status")int status);
	
	@Select("select * from lu_strategy_stock where status=#{status}")
	List<LuStrategyStock> findStatus(@Param("status")int status);
	
	@Select("select * from lu_strategy_stock")
	List<LuStrategyStock> find();
	
	@Select("select * from lu_strategy_stock where id=#{id} and code=#{code}")
	LuStrategyStock findIdCode(@Param("id")int id,@Param("code")String code);
	
	@Insert("insert into lu_strategy_stock (id,code,market,name,addtime,quittime,status,score,change_rate,curr_price,zongshizhi,shiyinglvttm,update_time"
			+ ",join_date,join_price,join_price_fu,curr_price_fu,total_change_rate) values "
			+ "(#{id},#{code},#{market},#{name},#{addtime},#{quittime},#{status},#{score},#{change_rate},#{curr_price},#{zongshizhi},#{shiyinglvttm},#{update_time}"
			+ ",#{join_date},#{join_price},#{join_price_fu},#{curr_price_fu},#{total_change_rate})")
	int insert(LuStrategyStock luStrategyStock);
	
	@Update("update lu_strategy_stock set market=#{market},name=#{name},addtime=#{addtime},quittime=#{quittime},status=#{status},score=#{score}"
			+ ",change_rate=#{change_rate},curr_price=#{curr_price},zongshizhi=#{zongshizhi},shiyinglvttm=#{shiyinglvttm},update_time=#{update_time}"
			+ ",join_date=#{join_date},join_price=#{join_price},join_price_fu=#{join_price_fu},curr_price_fu=#{curr_price_fu},total_change_rate=#{total_change_rate}"
			+ " where id=#{id} and code=#{code}")
	int update(LuStrategyStock luStrategyStock);
	
	@Delete("delete from lu_strategy_stock where id=#{id} and code=#{code}")
	int deleteIdCode(@Param("id")int id,@Param("code")String code);
	
	
	
}
