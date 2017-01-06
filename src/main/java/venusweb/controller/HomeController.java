package venusweb.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
//@RequestMapping("/admin")
public class HomeController {
	
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
	
}
