"use client"
import Tag from "./Tag";
const statuses = ['pass', 'fail', 'warn'];  
const titles = [  
    'Active', 'Pending', 'Completed', 'Available', 'Unavailable',   
    'In-progress', 'Cancelled', 'Approved', 'Denied', 'Rejected',   
    'Finalized', 'Confirmed', 'Inaccessible', 'Resolved', 'Paused',   
    'Under review', 'Validated', 'Failed', 'Success', 'Outstanding',   
    'Stalled', 'Initiated', 'Accomplished', 'Discontinued',   
    'Operational', 'Suspended', 'Decommissioned', 'Ongoing',   
    'Delayed', 'Temporary', 'Permanent', 'Abandoned',   
    'Compliant', 'Unresolved', 'On-hold', 'Inconsistent'  
];  

const TagsBoard = () => {
    const tags = titles.map((title, index) => ({  
        id: index,
        title: title,  
        status: statuses[Math.floor(Math.random() * statuses.length)]  
    })); 
    return (
        <div className="container mx-auto p-8">
            <div className="flex flex-wrap border border-1">
                {tags.map((tag) => ( 
                    <Tag key={tag.id} label={tag.title} status={tag.status} />
                ))}
            </div>
        </div>
    );
}
  
export default TagsBoard;