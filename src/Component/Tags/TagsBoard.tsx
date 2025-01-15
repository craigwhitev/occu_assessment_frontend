"use client"
import Tag from "./Tag";
const tags = ['connection', 'create', 'update', 'delete', 'save', 'load', 
    'edit', 'set', 'calculation','establish','remove','add','modify','change',
    'implement','apply', 'finish', 'start', 'stop', 'pause', 'resume', 'complete',
    'begin', 'terminate', 'halt', 'restart', 'reboot', 'shutdown', 'poweroff',
    'turnoff', 'turnon', 'produce', 'consume', 'generate', 'destroy', 'build', 'construct'];

const status = ['fail', 'warn', 'pass'];

const TagsBoard = () => {
    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-wrap">
                {tags.map((tag, index) => ( 
                    <Tag key={index} label={tag} status={status[index % 3]} />
                ))}
            </div>
        </div>
    );
}
  
export default TagsBoard;