package com.hsc.bang.InternalProject.QAProject.dao.Entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

@Entity
@Table(name="user_roles")
public class UserProfile {
	
	    @Id
	    @Column(name="user_role_id", length=15, unique=true, nullable=false)
	    @GeneratedValue(strategy=GenerationType.IDENTITY)
	    private int user_role_id; 
	 
	    @Column(name="role", nullable=false)
	    private String role; 
	     
	   /* @ManyToMany(fetch = FetchType.EAGER, mappedBy = "userProfiles")
	    private List<Users>users =new ArrayList<Users>();*/

		

		public int getUser_role_id() {
			return user_role_id;
		}

		public void setUser_role_id(int user_role_id) {
			this.user_role_id = user_role_id;
		}

		public String getRole() {
			return role;
		}

		public void setRole(String role) {
			this.role = role;
		}

		/*public List<Users> getUsers() {
			return users;
		}

		public void setUsers(List<Users> users) {
			this.users = users;
		}*/

		@Override
		public int hashCode() {
			final int prime = 31;
			int result = 1;
			result = prime * result + ((role == null) ? 0 : role.hashCode());
			result = prime * result + user_role_id;
			return result;
		}

		@Override
		public boolean equals(Object obj) {
			if (this == obj)
				return true;
			if (obj == null)
				return false;
			if (getClass() != obj.getClass())
				return false;
			UserProfile other = (UserProfile) obj;
			if (role == null) {
				if (other.role != null)
					return false;
			} else if (!role.equals(other.role))
				return false;
			if (user_role_id != other.user_role_id)
				return false;
		
			return true;
		}
		@Override
		public String toString() {
			return "UserProfile [user_role_id=" + user_role_id + ", role=" + role +"]";
		}
	}
	
