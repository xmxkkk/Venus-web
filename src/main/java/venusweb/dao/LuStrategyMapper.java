package venusweb.dao;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;
import org.springframework.stereotype.Component;

import venusweb.model.LuStrategy;

@Component
@Mapper
public interface LuStrategyMapper {
	
	@Select("select * from lu_strategy where status=#{status}")
	List<LuStrategy> findStatus(@Param("status")int status);

	@Select("select * from lu_strategy")
	List<LuStrategy> find();
	
	@Delete("delete from lu_strategy where id=#{id}")
	int delete(int id);

	@Select("select * from lu_strategy where id=#{id}")
	LuStrategy findId(@Param("id")int id);
	
	@Update("update lu_strategy set title=#{title},attr=#{attr},rate_3month=#{rate_3month},rate_1month=#{rate_1month},update_time=#{update_time},strategy_class=#{strategy_class}"
			+ ",up=#{up},down=#{down},flat=#{flat},img=#{img},type=#{type},modify_date=#{modify_date},interval_day=#{interval_day},status=#{status},run_status=#{run_status} where id=#{id}")
	int update(LuStrategy luStrategy);
	
	@Insert("insert into lu_strategy (id,title,attr,rate_3month,rate_1month,update_time,strategy_class,up,down,flat,img,type,modify_date,interval_day,status) values "
			+ "(#{id},#{title},#{attr},#{rate_3month},#{rate_1month},#{update_time},#{strategy_class},#{up},#{down},#{flat},#{img},#{type},#{modify_date},#{interval_day},#{status})")
	int insert(LuStrategy luStrategy);
	
}
