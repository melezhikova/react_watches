import PropTypes from "prop-types";
import React from 'react';

class Watch extends React.Component {
    state = {
        time: '00:00:00'
    }

    constructor (props) {
        super (props);
        this.zone = this.props.item.zone;

        this.now = null;
        this.interval = null;
    }

    render  () {
        const { item } = this.props;

        return (
            <div className="watch">
                <div className="city">{item.city}</div>
                <div className="time">{this.state.time}</div>
                <div className="del" data-city={item.city} onClick={this.props.delWatch}></div>
            </div>
        )
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.getnow();
        }, 1000)
    }

    getnow () {
        const now = new Date();
        const zoneTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + (this.zone * 3600000));
        let hours = zoneTime.getHours();
        if (hours < 10) {
            hours = `0${hours}`;
        }
        let minutes = zoneTime.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        let seconds = zoneTime.getSeconds();
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        this.setState({time: `${hours}:${minutes}:${seconds}`});
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }
}

Watch.propTypes = {
    item: PropTypes.object
}

Watch.defaultProps = {
    item: null
};

export default Watch;