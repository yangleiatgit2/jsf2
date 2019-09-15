<%@ page language="java" import="java.util.*"

contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f"%>

<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

<title>My JSF 'userChoose.jsp' starting page</title>

</head>

<body>

JSF测试信息！

<br/>

<f:view>

<h:form>

请选择查询项目：<br />

<h:selectOneMenu value="#{dw.type}"

valueChangeListener="#{dw.selectType}" id="selecttype">

<f:selectItem itemValue="JAVA" itemLabel="JAVA" />

<f:selectItem itemValue="C" itemLabel="C" />

</h:selectOneMenu>

<h:commandButton value="提交" action="#{dw.gourl}">

</h:commandButton>

</h:form>

</f:view>

</body>

</html>