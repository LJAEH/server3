package edu.kh.jsp.common;

import java.sql.Connection;
import java.sql.SQLException;

public class JDBCTemplate {
	
	public static Connection conn = null;
	
	public static Connection getConnection() {
		
		try {
			if ( conn != null || conn.isClosed()) {
				
				Properties prop = Properties()	
				
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return conn;
		
	}

}
