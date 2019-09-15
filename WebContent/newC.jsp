<%@ page language="java" contentType="text/html; charset=UTF-8"

    pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>

<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>

<title>My JSP 'newC.jsp' starting page</title>

</head>

<body>

JSF测试信息！<br/>

<f:view>

<h:form>
欢迎学习<h:outputText value="#{dw.type}"></h:outputText>语言，祝你成功！<br/>

</h:form>

</f:view>

</body>

</html>