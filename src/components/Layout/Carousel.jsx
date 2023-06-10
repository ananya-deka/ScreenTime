import classes from "./Carousel.module.css";
import Slider from "react-slick";
import nextArrow from "../../assets/icons8-next-50.png";
import prevArrow from "../../assets/icons8-back-50.png";
import { useRef } from "react";

function NextArrow(props) {
	const { className, onClick } = props;
	return (
		<img
			src={nextArrow}
			className={`${className} ${classes.arrow} ${classes.next_arrow}`}
			onClick={onClick}
		/>
	);
}

function PrevArrow(props) {
	const { className, onClick } = props;
	return (
		<img
			src={prevArrow}
			className={`${className} ${classes.arrow} ${classes.prev_arrow}`}
			style={{ display: `${onClick === null ? "none" : "block"}` }}
			onClick={onClick}
		/>
	);
}

const Carousel = (props) => {
	let settings = {
		infinite: props.children.length >= 7,
		slidesToShow: 7,
		slidesToScroll: 7,
		initialSlide: 0,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5,
					infinite: props.children.length >= 5,
				},
			},
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					infinite: props.children.length >= 4,
				},
			},
			{
				breakpoint: 750,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: props.children.length >= 2,
				},
			},
		],
	};
	return (
		<section className={classes.carousel}>
			<Slider {...settings}>{props.children}</Slider>
		</section>
	);
};

export default Carousel;
