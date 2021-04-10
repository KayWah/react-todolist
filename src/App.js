import './App.css';

import {GlobalStyle} from "./style";
import {renderRoutes} from "react-router-config"; //renderRoutes 读取路由配置转化为 Route 标签
import routes from "./routes/index";
import {HashRouter} from "react-router-dom";
//antd样式
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        {renderRoutes(routes)}
      </HashRouter>
    </div>
  );
}

export default App;
