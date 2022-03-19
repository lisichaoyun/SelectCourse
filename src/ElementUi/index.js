/** @format */
import vue from 'vue'
import {
  Button,
  Col,
  Descriptions,
  DescriptionsItem,
  Dialog,
  Form,
  FormItem,
  Image,
  Input,
  Loading,
  Menu,
  MenuItem,
  MenuItemGroup,
  Message,
  Pagination,
  Progress,
  Result,
  Row,
  Submenu,
  Table,
  TableColumn,
  Tag,
} from 'element-ui'

export default ()=>{
  vue.use(Button)
  vue.use(Input)
  vue.use(Form)
  vue.use(FormItem)
  vue.use(Row)
  vue.use(Col)
  vue.use(Result)
  vue.use(Progress)
  vue.use(Menu)
  vue.use(Submenu)
  vue.use(MenuItemGroup)
  vue.use(MenuItem)
  vue.use(Table)
  vue.use(TableColumn)
  vue.use(Pagination)
  vue.use(Descriptions)
  vue.use(DescriptionsItem)
  vue.use(Tag)
  vue.use(Dialog)
  vue.use(Image)
  vue.use(Loading.directive)//在标签内使用Loading
  // vue.prototype.$loading = Loading.service;//通过this调用$loading
  // vue.component(Message)//直接Message调用
  vue.prototype.$message=Message//通过this调用$message
}
