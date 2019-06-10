import React, { useState, Fragment, useMemo } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Popper from '@material-ui/core/Popper'
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
    { name: 'Smileys & People', icon: <TagFaces style={{ fontSize: 'unset' }} /> },
    { name: 'Animals & Nature', icon: <Pets style={{ fontSize: 'unset' }} /> },
    { name: 'Food & Drink', icon: <Cake style={{ fontSize: 'unset' }} /> },
    { name: 'Feelings & Signs', icon: <Favorite style={{ fontSize: 'unset' }} /> },
    { name: 'Sport', icon: <Pool style={{ fontSize: 'unset' }} /> },
    { name: 'Travel & Place', icon: <AirplanemodeActive style={{ fontSize: 'unset' }} /> },
    { name: 'Devices', icon: <DevicesOther style={{ fontSize: 'unset' }} /> },
    { name: 'Flags', icon: <Flag style={{ fontSize: 'unset' }} /> },
]

const emojiTypeMap = {
    '0': 'p', '1': 'n', '2': 'd', '3': 's', '4': 'a', '5': 't', '6': 'o', '7': 'f',
}

function EmojiBox({ anchorEl, open, ...other }) {

    const classes = makeStyles(emojiStyle)()
    // tabs change values
    const [value, setTab] = useState(0)
    function changeTab(event, value) {
        setTab(value)
    }

    let memoizedEmojis = useMemo(() => {
        // default value of value is: 0
        return emojis[emojiTypeMap[String(value)]]
    }, [value])

    return (
        <Popper
            open={open}
            anchorEl={anchorEl}
            transition
            placement="bottom"
            id="emoji-popup"
            {...other}
        >
            <Paper elevation={1} className={classes.emjBox}>
                <Tabs
                    className={classes.tabs}
                    value={value}
                    onChange={changeTab}
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                >
                    {emojiCategories.map(icon => (
                        <Tab key={icon.name} icon={icon.icon} title={icon.name} className={classes.tab} />
                    ))}
                </Tabs>
                <div className={classes.iconContainer}>
                    {value >= 0 && (
                        <Fragment>
                            {memoizedEmojis.map((item, i) => (
                                <span key={i} className={classes.iconSpan} onClick={() => console.log(item)}>
                                    <span>{item}</span>
                                </span>
                            ))}
                        </Fragment>
                    )}
                </div>
            </Paper>
        </Popper>
    )
}

export default EmojiBox