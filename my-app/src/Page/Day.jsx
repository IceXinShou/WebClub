import {useRouteData, useParams} from 'solid-app-router';
import {lazy, createResource, For, Show} from "solid-js";

import styles from './Day.module.scss';


const day = () => {
    console.log('render day');
    const user = useParams();

    const [resource] = createResource(() => user.id, async i => {
            const document = new DOMParser().parseFromString(
                await (await fetch(`/src/Page/Data/${i}.html`)).text()
                , 'text/html');
            // return [...document.head.children, ...document.body.children];
            return document.body.children;
        }
    )

    return (
        <div class={styles.day}>
            <span>{resource.loading && 'loading...'}</span>
            {resource.loading ||
                <For each={resource()}>{item => {
                    if (item.tagName === 'RGB')
                        item.style.color = item.getAttribute('color');
                    return item;
                }}</For>
            }
        </div>
    );
};

export default day;