package venusweb.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import venusweb.model.Picture;

@Component
@Mapper
public interface PictureMapper {
	
	@Select("select * from picture where id=#{id}")
	Picture find(String id);
	
	@Select("select * from picture where md5=#{md5}")
	Picture findMd5(String md5);
	
	@Select("select * from picture where path=#{path}")
	Picture findPath(String path);
	//int insert(Picture picture);
}
