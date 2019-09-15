package com.dw.action;
import javax.faces.event.ValueChangeEvent;

public class MyJsfAction {

	private String type;

	public String getType() {

	return type;

	}

	public void setType(String type) {

	this.type = type;

	}

	// 定义监听值改变的方法

	public void selectType(ValueChangeEvent event){

	String nameTemp = (String)event.getNewValue();

	if("JAVA".equals(nameTemp)){

	type = "JAVA";

	}else{

	type = "C";

	}

	}

	public String gourl(){

	return type;

	}

	}