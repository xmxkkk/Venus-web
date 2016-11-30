package venusweb.model;

public class LuStrategyStock {
	int id;
	String code;
	String market;
	String name;
	String addtime;
	String quittime;
	int status;
	int score;
	Double change_rate;
	Double curr_price;
	Double zongshizhi;
	Double shiyinglvttm;
	String update_time;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getMarket() {
		return market;
	}
	public void setMarket(String market) {
		this.market = market;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getAddtime() {
		return addtime;
	}
	public void setAddtime(String addtime) {
		this.addtime = addtime;
	}
	public String getQuittime() {
		return quittime;
	}
	public void setQuittime(String quittime) {
		this.quittime = quittime;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	public Double getChange_rate() {
		return change_rate;
	}
	public void setChange_rate(Double change_rate) {
		this.change_rate = change_rate;
	}
	public Double getCurr_price() {
		return curr_price;
	}
	public void setCurr_price(Double curr_price) {
		this.curr_price = curr_price;
	}
	public Double getZongshizhi() {
		return zongshizhi;
	}
	public void setZongshizhi(Double zongshizhi) {
		this.zongshizhi = zongshizhi;
	}
	public Double getShiyinglvttm() {
		return shiyinglvttm;
	}
	public void setShiyinglvttm(Double shiyinglvttm) {
		this.shiyinglvttm = shiyinglvttm;
	}
	public String getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(String update_time) {
		this.update_time = update_time;
	}
	@Override
	public String toString() {
		return "LuStrategyStock [id=" + id + ", code=" + code + ", market=" + market + ", name=" + name + ", addtime="
				+ addtime + ", quittime=" + quittime + ", status=" + status + ", score=" + score + ", change_rate="
				+ change_rate + ", curr_price=" + curr_price + ", zongshizhi=" + zongshizhi + ", shiyinglvttm="
				+ shiyinglvttm + ", update_time=" + update_time + "]";
	}
	
}
