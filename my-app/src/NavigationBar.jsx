import {createSignal, onCleanup} from 'solid-js';
import logo from './logo.svg';
import {Link} from 'solid-app-router';
import './NavigationBar.scss';
import navListIcon from './assets/Hamburger_icon.svg';

export default function NavigationBar() {
    console.log('Render NavigationBar');

    const root = document.documentElement;
    const minHeight = root.style.getPropertyValue('--headerMinHeight');

    // Scroll status
    const [scrollTop, setScrollTop] = createSignal(window.scrollY < 50);

    function scroll() {
        // setScrollTop(window.scrollY < 50);
        if (window.scrollY < 30)
            root.style.setProperty('--headerHeight', (70 - window.scrollY) + 'px');
        else
            root.style.setProperty('--headerHeight', '40px');
    }

    function mousemove(e) {
        setScrollTop(e.clientY < 70);
    }

    document.addEventListener('scroll', scroll);
    document.addEventListener('mousemove', mousemove);
    onCleanup(() => {
        document.removeEventListener('scroll', scroll);
        document.removeEventListener('mousemove', mousemove);
    });


    // buttonControl
    return (
        <div class="NavBar NoSelect" classList={{FullSizeHeader: scrollTop()}}>
            <Link class="HomeButton" href="/Users/Public">
                <div class="icon VerticalCenter"><img src={logo} alt="logo"/></div>
                <div class="title">MEOW</div>
            </Link>
            <nav>
                <ul>
                    <li><Link class="HeaderButton" href="page/day/1">DAY 1</Link></li>
                    <li><Link class="HeaderButton" href="page/day/2">DAY 2</Link></li>
                    <li><Link class="HeaderButton" href="page/day/3">DAY 3</Link></li>
                    <li><Link class="HeaderButton" href="page/day/4">DAY 4</Link></li>
                    <li><Link class="HeaderButton" href="page/day/5">DAY 5</Link></li>
                    <li><Link class="HeaderButton" href="page/day/6">DAY 6</Link></li>
                </ul>
            </nav>
            <div class="NavListIcon">
                <img src={navListIcon}/>
            </div>
        </div>
    );
}