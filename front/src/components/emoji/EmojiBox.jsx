import React, { useState, Fragment } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
// import icons
import {
    TagFaces, Pets, Cake, Favorite, Pool, AirplanemodeActive,
    DevicesOther, Flag,
} from '@material-ui/icons'
// import style
import emojiStyle from './emojiStyle'
import emojis from './emoji_data'
// 's': 'Feelings & Signs', 'p': 'Smileys & People', 'f': Flag, 'd': Food, t: travel, n: nature a: spport, o: devide, 

const emojiCategories = [
    { name: 'Smileys & People', icon: (props) => <TagFaces className={props} /> },
    { name: 'Animals & Nature', icon: (props) => <Pets className={props} /> },
    { name: 'Food & Drink', icon: (props) => <Cake className={props} /> },
    { name: 'Feelings & Signs', icon: (props) => <Favorite className={props} /> },
    { name: 'Sport', icon: (props) => <Pool className={props} /> },
    { name: 'Travel & Place', icon: (props) => <AirplanemodeActive className={props} /> },
    { name: 'Devices', icon: (props) => <DevicesOther className={props} /> },
    { name: 'Flags', icon: (props) => <Flag className={props} /> },
]

function EmojiBox() {

    const classes = makeStyles(emojiStyle)()
    // tabs change values
    const [value, setTab] = useState(0)
    function changeTab(event, value) {
        setTab(value)
    }

    return (
        <Paper elevation={1} className={classes.emjBox}>
            <Tabs
                className={classes.tabs}
                value={value}
                onChange={changeTab}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                scrollButtons="on"
            >
                {emojiCategories.map(icon => (
                    <Tab key={icon.name} icon={icon.icon(classes.tabIcon)} title={icon.name} className={classes.tab} />
                ))}
            </Tabs>
            <div className={'hihi'}>
                {value === 0 && (
                    <Fragment>
                        {emojis.p.map((item, i) => (
                            <span key={i} className={classes.iconSpan}>
                                <span>{item}</span>
                            </span>
                        ))}
                    </Fragment>
                )}

                {value === 1 && (
                    <Fragment>
                        {emojis.n.map((item, i) => (
                            <span key={i} className={classes.iconSpan}>
                                <span>{item}</span>
                            </span>
                        ))}
                    </Fragment>
                )}

                {value === 2 && (
                    <Fragment>
                        {emojis.d.map((item, i) => (
                            <span key={i} className={classes.iconSpan}>
                                <span>{item}</span>
                            </span>
                        ))}
                    </Fragment>
                )}

                {value === 3 && (
                    <Fragment>
                        {emojis.s.map((item, i) => (
                            <span key={i} className={classes.iconSpan}>
                                <span>{item}</span>
                            </span>
                        ))}
                    </Fragment>
                )}

                {value === 4 && (
                    <Fragment>
                        {emojis.a.map((item, i) => (
                            <span key={i}>
                                <span>{item}</span>
                            </span>
                        ))}
                    </Fragment>
                )}

                {value === 5 && (
                    <Fragment>
                        {emojis.t.map((item, i) => (
                            <span key={i} className={classes.iconSpan}>
                                <span>{item}</span>
                            </span>
                        ))}
                    </Fragment>
                )}

                {value === 6 && (
                    <Fragment>
                        {emojis.o.map((item, i) => (
                            <span key={i} className={classes.iconSpan}>
                                <span>{item}</span>
                            </span>
                        ))}
                    </Fragment>
                )}

                {value === 7 && (
                    <Fragment>
                        {emojis.f.map((item, i) => (
                            <span key={i} className={classes.iconSpan}>
                                <span>{item}</span>
                            </span>
                        ))}
                    </Fragment>
                )}
            </div>
        </Paper>
    )
}

export default EmojiBox