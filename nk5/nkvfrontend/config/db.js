var Schema = require('jugglingdb').Schema;

schema = new Schema('postgres', {database:'nk5', username:'postgres', password:'root', port: 5432});

var Computer = schema.define('Computer', {
  cid:          Number,
  x:            Number,
  y:            Number,
  locked:       { type: Boolean, default: false }
});

var Process = schema.define('Process', {
	Id: Number,
	MachineName: String,
	MainModule: String,
	MainWindowTitle: String,
	StartTime: Number,
	ExitTime: Number,
	ExitCode: Number,
	ProcessName: String,
	User: String,
	ProcessOwner: String
});

var ProcessEvent = schema.define('ProcessEvent', {
	Type: String,
	pid: Number,
	Time: Date
});

var Session = schema.define('Session', {
	Type: String,
	MachineName: String,
	UserName: String,
	Time: Date
});

var Log = schema.define('Log', {
  id: Number,
  type: String,
  host_name: String,
  time: Date,
  user_name:String,
  os:String,
  process_id:String,
  application:String,
  message:String,
});

var UserMenu = schema.define('UserMenu', {
  id: Number,
  userid: Number,
  menuid: Number
});
var MenuTable = schema.define('Menu', {
  id: Number,
  page: String,
  name: String,
  classname:String,
  description:String,
  superior:Number
});

var User = schema.define('User', {
  id: Number,
  username: String,
  password: String,
  name:String,
  role:String,
  isopen: { type: Boolean, default: false },
  lastreadtime:Date,
  lastlogintime:Date,
  width:Number,
  height:Number
});

var Task = schema.define('Task', {
  name:                 String,
  action:               String,
  memo:                 String,
  execute:              String,
  cycle:                String,
  weekdays:             String,
  month_days:           String,
  date:                 String,
  countdown:            Number,
  command:              String,
  mac:                  String,
  prefix:               String,
  size:                 Number,
  start_number:         Number,
  update_mode:          String,
  update_wait_time:     Number,
  snapshot_comment:     String,
  time:                 String,
  computer_uuid:        String,
  computer_name:        String,
  menu_pack_id:         String,
  last_run_status:      String,
  last_run_date:        Date,
  last_run_log:         String,
  next_execution_date:  Date,
  enable:            { type: Boolean, default: true }
});

var ComputerInfo = schema.define('ComputerInfo', {
  id:         Number,
  cid:        Number,
  ip:         String,
  mac:        String,
  boot_menu_id :Number,
  boot_menu_name :String,
  menu_detail: String,
  boot_image_id :Number,
  boot_image_name :String,
  os: String,
  logon_user: String,
  logon_time: String,
  boot_time :String,
  update_time: Date,
});

var TaskLogFile = schema.define('TaskLogFile', {
  id:         Number,
  taskid:     Number,
  folder:     String,
});

var Menu = schema.define('Menus', {});
var Pack = schema.define('Pack', {});
var Disk = schema.define('Disk', {});
var Group = schema.define('Group', {});
// Task.belongsTo(Computer, {as: 'computer', foreignKey:'computer_id'})

module.exports.Schema = schema;
module.exports.Group = Group;
module.exports.Computer = Computer;
module.exports.Task = Task;
module.exports.Menu = Menu;
module.exports.Pack = Pack;
module.exports.Disk = Disk;
module.exports.Process = Process;
module.exports.ProcessEvent = ProcessEvent;
module.exports.Session = Session;
module.exports.Log = Log;
module.exports.UserMenu = UserMenu;
module.exports.User = User;
module.exports.MenuTable = MenuTable;
module.exports.ComputerInfo = ComputerInfo;
module.exports.TaskLogFile = TaskLogFile;