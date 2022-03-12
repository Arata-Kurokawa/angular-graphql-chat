/*
 * This file is part of the KIDSNA Connect service.
 *
 * For the full copyright and license information,
 * please view the LICENSE file that was distributed with this source code.
 */

import {ChatMessage} from "./chat-message"

export type ChatRoom = {
  id: number,
  name: string,
  messages: ChatMessage[]
}
