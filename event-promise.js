const event = (target, type) =>
	new Promise((resolve, reject) =>
		target.on(type, r => resolve(r)))

export default event
