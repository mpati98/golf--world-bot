import './App.css';
import ChatBot from "react-chatbotify";

const mainMenu = ["Home", "Golf News", "Shopping", "Learning"];

const flow = {
  start: {
    message: "Chào mừng bạn đến với Golf love, nơi giao lưu chia sẽ của golfer?",
    transition: 1000,
    path: "showMenu"
  },
	showMenu: {
			message: "Tôi có thể giúp gì cho bạn?",
			options: mainMenu,
			path: "processMenu"
		},
	prompt_again: {
			message: "Bạn cần giúp gì nữa không",
			options: mainMenu,
			path: "processMenu"
		},
	unknown_input: {
			message: "Yêu cầu của bạn đã được ghi nhận và sẽ cập nhật sớm nhất có thể, để lại gmail để nhận thông báo sớm nhất nhé!",
			options: mainMenu,
			path: "processMenu"
		},
  processMenu: {
			transition: {duration: 0},
			chatDisabled: true,
			path: async (params) => {
				let link = "";
				switch (params.userInput) {
				case "Home":
					link = "https://golf-worlf-app.streamlit.app";
					break;
				case "Golf News":
					link = "https://golf-worlf-app.streamlit.app/";
					break;
				case "Shopping":
					link = "https://golf-worlf-app.streamlit.app/product";
					break;
				case "Learning":
					link = "https://golf-worlf-app.streamlit.app/golfClass";
					break;
				default:
					return "unknown_input";
				}
				await params.injectMessage("Chờ tý, đến ngay");
				setTimeout(() => {
					window.open(link);
				}, 1000)
				return "repeat"
			},
		},
	repeat: {
			transition: {duration: 3000},
			path: "prompt_again"
		}
}

function App() {
  return (
    <ChatBot flow={flow}/>
  );
}

export default App;
