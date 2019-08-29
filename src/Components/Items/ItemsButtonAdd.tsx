import uuid from "uuid/v4";

import { Button } from "utils/Components";

const { __ } = wp.i18n;
const { useCallback } = wp.element;

export const ItemsButtonAdd: React.ComponentType<ItemsProps> = props => {
	const { posts_list, updateList } = props;
	const onClick = useCallback(
		() =>
			updateList([
				...posts_list,
				{
					id: uuid(),
					post_id: 0,
					post_type: ""
				}
			]),
		[posts_list]
	);

	return (
		<Button
			className={["button", "button-text", "button-add"]}
			onClick={onClick}
		>
			{__("Add Post")}
		</Button>
	);
};