package venusweb.model;

public class LuStrategy {
	int id;
	String title;
	String attr;
	Double rate_3month;
	Double rate_1month;
	String update_time;
	String strategy_class;
	int up;
	int down;
	int flat;
	String img;
	String type;
	String modify_date;
	int interval_day;
	int status;
	int run_status;
	
	public int getRun_status() {
		return run_status;
	}
	public void setRun_status(int run_status) {
		this.run_status = run_status;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getAttr() {
		return attr;
	}
	public void setAttr(String attr) {
		this.attr = attr;
	}
	public Double getRate_3month() {
		return rate_3month;
	}
	public void setRate_3month(Double rate_3month) {
		this.rate_3month = rate_3month;
	}
	public Double getRate_1month() {
		return rate_1month;
	}
	public void setRate_1month(Double rate_1month) {
		this.rate_1month = rate_1month;
	}
	public String getUpdate_time() {
		return update_time;
	}
	public void setUpdate_time(String update_time) {
		this.update_time = update_time;
	}
	public String getStrategy_class() {
		return strategy_class;
	}
	public void setStrategy_class(String strategy_class) {
		this.strategy_class = strategy_class;
	}
	public int getUp() {
		return up;
	}
	public void setUp(int up) {
		this.up = up;
	}
	public int getDown() {
		return down;
	}
	public void setDown(int down) {
		this.down = down;
	}
	public int getFlat() {
		return flat;
	}
	public void setFlat(int flat) {
		this.flat = flat;
	}
	public String getImg() {
		return img;
	}
	public void setImg(String img) {
		this.img = img;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getModify_date() {
		return modify_date;
	}
	public void setModify_date(String modify_date) {
		this.modify_date = modify_date;
	}
	public int getInterval_day() {
		return interval_day;
	}
	public void setInterval_day(int interval_day) {
		this.interval_day = interval_day;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "LuStrategy [id=" + id + ", title=" + title + ", attr=" + attr + ", rate_3month=" + rate_3month
				+ ", rate_1month=" + rate_1month + ", update_time=" + update_time + ", strategy_class=" + strategy_class
				+ ", up=" + up + ", down=" + down + ", flat=" + flat + ", img=" + img + ", type=" + type
				+ ", modify_date=" + modify_date + ", interval_day=" + interval_day + ", status=" + status + "]";
	}
	
}
