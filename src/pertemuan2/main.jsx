import { createRoot } from "react-dom/client";
import HelloWorld from "./Helloworld";
import Container from "./Container";
import Artikel from "./Artikel";
import Qna from "./Qna";
import './custom.css';

createRoot(document.getElementById("root"))
    .render(
        <div>
            <Container>
                {/* <HelloWorld/> */}
                <Artikel/>
                <hr />
                <Qna/>
            </Container>
        </div>
    )