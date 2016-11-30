package venusweb.model;

public class Picture {
	int id;
	String path;
	String url;
	String md5;
	String sha1;
	int status;
	int create_time;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getMd5() {
		return md5;
	}
	public void setMd5(String md5) {
		this.md5 = md5;
	}
	public String getSha1() {
		return sha1;
	}
	public void setSha1(String sha1) {
		this.sha1 = sha1;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getCreate_time() {
		return create_time;
	}
	public void setCreate_time(int create_time) {
		this.create_time = create_time;
	}
	@Override
	public String toString() {
		return "Picture [id=" + id + ", path=" + path + ", url=" + url + ", md5=" + md5 + ", sha1=" + sha1 + ", status="
				+ status + ", create_time=" + create_time + "]";
	}
	

}
